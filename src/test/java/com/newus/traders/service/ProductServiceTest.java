/**
 * @author wheesunglee
 * @create date 2023-09-20 14:23:15
 * @modify date 2023-09-21 12:33:36
 */

package com.newus.traders.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.newus.traders.product.Product;
import com.newus.traders.product.ProductDto;
import com.newus.traders.product.ProductRepository;
import com.newus.traders.product.ProductService;

public class ProductServiceTest {
    // 가상의 ProductRepository: 프로그램에서 구성한 메소드, 형식을 다 갖추었지만 이 공간내에서 가상으로 존재
    // 이 테스트 코드에서 repository에 저장하거나 삭제하는 데이터는 DB의 productRepository에 영향을 주지 않음
    @Mock
    private ProductRepository productRepository;

    // 레파지토리를 사용하는 서비스 클래스에
    // Mock 객체인 productRepository를 넣어준다는 뜻으로 이해
    @InjectMocks
    private ProductService productService;

    Product product1;
    Product product2;

    // 테스트 코드를 실행하기 위한 초기 설정
    // 코드마다 세팅이 다름
    // 여기서는 가상의 repository에 아무런 데이터가 없기 때문에
    // 데이터를 만들어서 repository에 넣어주고
    // repository의 기존 메소드들을 실행하며 나올 결과를 설정
    @BeforeEach
    public void setUp() {

        // 이 클래스에서 Mockito를 사용
        MockitoAnnotations.openMocks(this);

        // Product 객체를 만들기
        product1 = Product.builder()
                .id(1)
                .price(1000L)
                .description("")
                .postedAt(null)
                .status(null)
                .latitude(0.0)
                .longitude(0.0)
                .build();

        product2 = Product.builder()
                .id(2)
                .price(2000L)
                .description("")
                .postedAt(null)
                .status(null)
                .latitude(0.0)
                .longitude(0.0)
                .build();

        // 가상 productRepository에 product 데이터들 저장
        productRepository.save(product1);
        productRepository.save(product2);

        // Mock 객체(여기서는 productRepository)의 메소드 기본적으로 null만 반환하도록 되어있음
        // 그래서 when(메소드).thenReturn(결과)을 사용하여 메소드 호출시에 반환될 결과값을 설정해야함

        // 레포지토리의 모든 결과를 반환하는 findAll()의 결과값은 List
        // 현재는 product1과 product2가 레포지토리에 저장되어 있기 때문에,
        // when(productRepository.findAll()) : productRepository의 모든 데이터를 찾는 메소드를 호출하면
        // .thenReturn() : 반환을 하라
        // Arrays.asList(product1, product2) : product1과 product2가 담겨 있는 리스트를 반환
        when(productRepository.findAll()).thenReturn(Arrays.asList(product1, product2));

        // when(productRepository.findById(1)) : productRepository의 id값으로 데이터를 찾는 메소드를
        // 호출하면
        // .thenReturn(Optional.of(product1)); : Optional<Product> 클래스에 product1을 넣어서 반환
        when(productRepository.findById(1)).thenReturn(Optional.of(product1));
        // 존재하지 않는 id로 데이터를 찾으면 Optional<Product> 가 null을 반환
        when(productRepository.findById(3)).thenReturn(Optional.empty());

        // 한개의 데이터를 조회할 때는 Optional을 사용
        // 데이터가 있으면 .get()을 이용하여 데이터를 객체에 담고
        // 없다면 null
        // 여러개의 데이터를 조회할 때는 리스트 사용
        // 데이터가 없다면 리스트의 크기는 0

    }

    // productService의 getAllProducts 코드를 테스트함
    // getAllProducts는 productRepository의 모든 product 데이터를 가져옴
    @Test
    void getAllProducts() {

        // Product를 ProductDto로 바꿔줌 -> 원래 서비스에서 dto로 바꿔주는 작업 존재
        // 원래 서비스 코드에서 dto로 바꿔준 이유는
        // 1. entity 보호 차원
        // 2. dto는 엔티티 비슷하지만 다르게 구성이 가능 -> 원본 데이터를 조금 가공하여 개발자의 의도에 맞게 정보를 가공할 수 있기 때문
        // ProductDto.from() : 메소드는 사용자 정의 static 메소드 - 객체 생성없이 사용가능한 메소드 -> 클래스명.메소드로 바로 사용
        ProductDto productDto1 = ProductDto.from(product1);
        ProductDto productDto2 = ProductDto.from(product2);

        // 이제는 productService.getAllProducts()를 사용하여 코드의 실제 반환값을 저장
        List<ProductDto> productDtoList = productService.getAllProducts();

        // 실제값과 예상값 리스트들의 크기 비교
        assertEquals(productDtoList.size(), 2);

        // product1의 가격은 1000L이고, productDtoList 1번째 productDto의 가격과 같아야함
        assertEquals(productDtoList.get(0).getPrice(), productDto1.getPrice());
        // product2의 가격은 2000L,
        assertEquals(productDtoList.get(1).getPrice(), productDto2.getPrice());
    }

    // id를 가지고 하나의 물품을 조회하는 코드 테스트
    // 상세페이지를 보려고 할 때 이 코드가 사용됨
    @Test
    void getProduct() {

        // findById는 아이디를 입력해서 하나의 물품을 조회하는 메소드
        // repository에서 id = 1인 물품을 조회
        // 반환되는 값은 Product 객체가 아닌 Optional<Product>
        // Optional이 붙은 이유는 repository에 해당 객체가 있을 수도 없을 수도(null) 있기 때문
        ProductDto productDto = productService.getProduct(1);

        assertEquals(1000L, productDto.getPrice());
    }

    // 존재하지 않는 데이터를 조회하려고 하는 테스트
    // productService에서 예외로 지정해둔 Optional<Product>가 null인 경우도 테스트 해줘야함
    @Test
    void getNotExistingProduct() {

        // 위에서 만들어주지 않은 id = 3인 product를 조회
        ProductDto productDto = productService.getProduct(3);

        // productDto는 null임을 확인
        assertNull(productDto);
    }
}
