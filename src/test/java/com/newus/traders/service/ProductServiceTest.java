/**
 * @author wheesunglee
 * @create date 2023-09-20 14:23:15
 * @modify date 2023-10-05 14:27:31
 */

package com.newus.traders.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.newus.traders.exception.CustomException;
import com.newus.traders.product.dto.ProductDto;
import com.newus.traders.product.entity.Product;
import com.newus.traders.product.form.ProductRegisterForm;
import com.newus.traders.product.repository.ProductRepository;
import com.newus.traders.product.service.ProductService;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    ProductRegisterForm form1 = new ProductRegisterForm("product1", 1L, "product no.1", "clothes", 37.49, 127.03);
    ProductRegisterForm form2 = new ProductRegisterForm("product2", 2L, "product no.2", "shoes", 37.8, 127.06);
    ProductDto productDto1 = new ProductDto(form1);
    ProductDto productDto2 = new ProductDto(form2);;
    Product product1 = new Product(productDto1);
    Product product2 = new Product(productDto2);

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllProducts() {
        
        when(productRepository.findAll()).thenReturn(Arrays.asList(product1, product2));

        List<ProductDto> productDtoList = productService.getAllProducts();

        assertEquals(productDtoList.size(), 2);
        assertEquals(productDtoList.get(0).getPrice(), 1L);
        assertEquals(productDtoList.get(1).getPrice(), 2L);
    }

    @Test
    void getEmptyList() {
        
        when(productRepository.findAll()).thenReturn(new ArrayList<>());
        
        assertThrows(CustomException.class, () -> {
            productService.getAllProducts();
        });
    }

    @Test
    void getProduct() {
        
        when(productRepository.findById(1)).thenReturn(Optional.of(product1));

        ProductDto productDto = productService.getProduct(1);

        assertEquals(productDto.getPrice(), 1L);
    }

    @Test
    void getNotExistingProduct() {

        when(productRepository.findById(3)).thenReturn(Optional.empty());

         assertThrows(CustomException.class, () -> {
            productService.getProduct(3);
        });
    }

    @Test
    void registerProduct() {
        
        when(productRepository.save(product1)).thenReturn(product1);
        
        String result = productService.registerProduct(form1);
        
        assertEquals("물품 등록을 완료하였습니다.", result);
    }

    @Test
    void deleteProduct() {

        when(productRepository.findById(1)).thenReturn(java.util.Optional.of(product1));
        
        String result = productService.deleteProduct(1);
        
        verify(productRepository).delete(product1);
        
        assertEquals("물품 삭제를 완료하였습니다.", result);
    }

    @Test
    void getNearestProducts() {
        
        when(productRepository.findByDistance(37.49, 127.03, 3)).thenReturn(Arrays.asList(product1));

        List<ProductDto> productDtoList = productService.getNearestProducts(37.49, 127.03);

        assertEquals(productDtoList.size(), 1);
        assertEquals(productDtoList.get(0).getPrice(), 1L);
    }

}
