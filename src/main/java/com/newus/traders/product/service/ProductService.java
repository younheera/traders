/**
 * @author wheesunglee
 * @create date 2023-09-19 08:19:20
 * @modify date 2023-10-06 18:48:22
 */
package com.newus.traders.product.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.newus.traders.exception.CustomException;
import com.newus.traders.exception.ErrorCode;
import com.newus.traders.product.dto.ProductDto;
import com.newus.traders.product.entity.Image;
import com.newus.traders.product.entity.Product;
import com.newus.traders.product.form.ProductForm;
import com.newus.traders.product.repository.ImageRepository;
import com.newus.traders.product.repository.ProductRepository;
import com.newus.traders.product.type.ProductStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;

    public List<ProductDto> getAllProducts() {
        List<Product> productList = productRepository.findAll();

        if (productList.size() == 0) {
            // 리스트가 0일 경우에 --- 메세지를 좀 수정할 필요는 보임!
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductDto> productDtoList = new ArrayList<>();

        for (Product product : productList) {
            productDtoList.add(new ProductDto(product));
        }

        return productDtoList;
    }

    public ProductDto getProduct(int productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (!optionalProduct.isPresent()) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        Product product = optionalProduct.get();

        return new ProductDto(product);
    }

    public void saveImage(List<MultipartFile> files, Product product) throws Exception {

        String projectPath = System.getProperty("user.dir") + "/src/main/resources/static/files";

        for (MultipartFile file : files) {

            UUID uuid = UUID.randomUUID();
            String filename = uuid + "_" + file.getOriginalFilename();

            File savedFile = new File(projectPath, filename);
            file.transferTo(savedFile);

            Image image = new Image(filename);
            image.setProduct(product);

            imageRepository.save(image);
        }
    }

    public void deleteImage(List<Integer> removedFiles) throws Exception {

        removedFiles.stream().forEach(id -> imageRepository.deleteById(id));

    }

    public String registerProduct(ProductForm productForm, List<MultipartFile> files) {

        try {
            Product product = new Product(productForm);
            productRepository.save(product);

            saveImage(files, product);

        } catch (Exception exception) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_SAVED);
        }

        return "물품 등록을 완료하였습니다.";
    }

    public String updateProduct(int productId, ProductForm productForm, List<MultipartFile> newFiles,
            List<Integer> removedFiles) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        if (!product.getStatus().equals(ProductStatus.AVAILABLE)) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_UPDATED);
        }

        try {
            product.updateProduct(productForm);

            productRepository.save(product);

            saveImage(newFiles, product);

            deleteImage(removedFiles);

        } catch (Exception exception) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_SAVED);
        }

        return "물품 수정을 완료하였습니다.";
    }

    public String deleteProduct(int productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        try {
            productRepository.delete(product);

        } catch (RuntimeException exception) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_DELETED);
        }

        return "물품 삭제를 완료하였습니다.";
    }

    public String purchaseProduct(int productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        product.purchaseProduct();

        try {
            productRepository.save(product);

        } catch (Exception exception) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_SAVED);
        }

        return "물품이 판매되었습니다.";
    }

    /**
     * @author jeongyearim
     * @create date 2023-09-26 17:33:07
     * @modify date 2023-09-26 17:33:07
     * @desc [주어진 중심 위도와 경도를 기준으로 3km 반경 내의 상품 리스트를 뽑아옵니다.]
     */

    // 3km 반경의 상품 리스트를 뽑아오기
    public List<ProductDto> getNearestProducts(double latitude, double longitude) {

        // 3km 반경
        double distance = 3.0;

        List<Product> nearestProductList = productRepository.findByDistance(latitude, longitude, distance);

        if (nearestProductList.size() == 0) {
            throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductDto> nearestProductDtoList = new ArrayList<>();

        for (Product product : nearestProductList) {
            nearestProductDtoList.add(new ProductDto(product));
        }

        return nearestProductDtoList;
    }

}
