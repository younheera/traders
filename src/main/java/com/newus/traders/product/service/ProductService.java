/**
 * @author wheesunglee
 * @create date 2023-09-19 08:19:20
 * @modify date 2023-10-22 13:29:10
 */
/**
* @author jeongyearim
* @create date 2023-09-26 17:33:07
* @modify date 2023-09-26 17:33:07
* @desc [주어진 중심 위도와 경도를 기준으로 3km 반경 내의 상품 리스트를 뽑아옵니다.]
*/
package com.newus.traders.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.newus.traders.chat.dto.ChatDto;
import com.newus.traders.chat.repository.ChatRepository;
import com.newus.traders.exception.CustomException;
import com.newus.traders.exception.ErrorCode;
import com.newus.traders.image.service.ImageService;
import com.newus.traders.product.dto.ProductDto;
import com.newus.traders.product.entity.Product;
import com.newus.traders.product.form.ProductForm;
import com.newus.traders.product.repository.ProductRepository;
import com.newus.traders.product.type.ProductStatus;
import com.newus.traders.redis.service.RedisService;
import com.newus.traders.user.entity.User;
import com.newus.traders.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final RedisService redisService;
    private final ImageService imageService;
    private final ChatRepository chatRepository;

    public User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    public List<ProductDto> getAllProducts() {

        List<Product> productList = productRepository.findAll();

        if (productList.size() == 0) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductDto> productDtoList = new ArrayList<>();
        for (Product product : productList) {

            ProductDto productDto = new ProductDto(product);

            Long likes = redisService.countLikes(product.getId());

            if (likes != null) {
                productDto.setLikes(likes);
            }

            productDtoList.add(productDto);
        }

        return productDtoList;
    }

    public List<ProductDto> getMyProducts(String username) {
        User user = getUser(username);

        List<Product> productList = productRepository.findBySeller(user);

        if (productList.size() == 0) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductDto> productDtoList = new ArrayList<>();
        for (Product product : productList) {

            ProductDto productDto = new ProductDto(product);
            Long likes = redisService.countLikes(product.getId());

            if (likes != null) {
                productDto.setLikes(likes);
            }

            productDtoList.add(productDto);

        }

        return productDtoList;
    }

    public ProductDto getProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        ProductDto productDto = new ProductDto(product);
        Long likes = redisService.countLikes(product.getId());

        if (likes != null) {
            productDto.setLikes(likes);
        }

        return productDto;
    }

    public List<ProductDto> getSearchedProducts(List<Long> productIdList) {

        return productIdList.stream().map(id -> (getProduct(id)))
                .collect(Collectors.toList());
    }

    @Transactional
    public String registerProduct(String username, ProductForm productForm, List<MultipartFile> files) {

        User user = getUser(username);

        Product product = new Product(user, productForm);

        productRepository.save(product);

        try {

            imageService.saveImage(files, product);

        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            throw new CustomException(ErrorCode.PRODUCT_NOT_SAVED);
        }

        return "물품 등록을 완료하였습니다.";
    }

    @Transactional
    public String updateProduct(String username, Long productId, ProductForm productForm,
            List<MultipartFile> newFiles, List<Integer> removedFiles) {

        User user = getUser(username);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        if (user != product.getSeller() || !product.getStatus().equals(ProductStatus.AVAILABLE)) {

            throw new CustomException(ErrorCode.PRODUCT_NOT_UPDATED);
        }

        product.updateProduct(productForm);

        productRepository.save(product);

        try {
            if (newFiles != null && newFiles.size() != 0) {
                System.out.println("saveImage시작");
                imageService.saveImage(newFiles, product);
            }

            if (removedFiles != null && removedFiles.size() != 0) {
                System.out.println("deleteImage시작");

                imageService.updateImage(removedFiles);
            }

        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            throw new CustomException(ErrorCode.PRODUCT_NOT_UPDATED);
        }

        return "물품 수정을 완료하였습니다.";
    }

    public String deleteProduct(String username, Long productId) {

        User user = getUser(username);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        if (user != product.getSeller()) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_DELETED);
        }

        List<Integer> imagesToDelete = product.getImages().stream()
                .map(image -> image.getId())
                .collect(Collectors.toList());
        try {
            imageService.deleteImage(imagesToDelete);

        } catch (Exception exception) {
            System.out.println(exception.getMessage());

            throw new CustomException(ErrorCode.PRODUCT_NOT_DELETED);
        }
        productRepository.deleteById(productId);

        redisService.deleteKey(productId);

        return "물품 삭제를 완료하였습니다.";
    }

    public void updateAfterTransaction(ProductDto product, Long clientInfo) {
        
        purchaseProduct(product.getId());

        String roomNum = "";
        ChatDto chatDto = new ChatDto();
        chatDto.setText("거래완료");
        chatDto.setRoomNum(roomNum);
        chatRepository.save(chatDto);

    }

    public void purchaseProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        product.purchaseProduct();

        productRepository.save(product);

    }

    public List<ProductDto> getNearestProducts(double latitude, double longitude) {
        // 3km 반경
        double distance = 3.0;

        List<Product> nearestProductList = productRepository.findByDistance(latitude, longitude, distance);

        if (nearestProductList.size() == 0) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductDto> nearestProductDtoList = new ArrayList<>();

        for (Product product : nearestProductList) {

            ProductDto productDto = new ProductDto(product);
            Long likes = redisService.countLikes(product.getId());

            if (likes != null) {
                productDto.setLikes(likes);
            }

            nearestProductDtoList.add(productDto);
        }

        return nearestProductDtoList;
    }

}
