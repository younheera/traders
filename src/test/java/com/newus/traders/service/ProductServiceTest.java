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
import com.newus.traders.product.form.ProductForm;
import com.newus.traders.product.repository.ProductRepository;
import com.newus.traders.product.service.ProductService;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    ProductForm form1 = new ProductForm("product1", 1L, "product no.1", "clothes", 37.49, 127.03);
    ProductForm form2 = new ProductForm("product2", 2L, "product no.2", "shoes", 37.8, 127.06);
    Product product1 = new Product(form1);
    Product product2 = new Product(form2);
    ProductDto productDto1 = new ProductDto(product1);
    ProductDto productDto2 = new ProductDto(product2);

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
        
        when(productRepository.findByIdAndIsDeletedFalse(1L)).thenReturn(Optional.of(product1));

        ProductDto productDto = productService.getProduct(1L);

        assertEquals(productDto.getPrice(), 1L);
    }

    @Test
    void getNotExistingProduct() {

        when(productRepository.findByIdAndIsDeletedFalse(3L)).thenReturn(Optional.empty());

         assertThrows(CustomException.class, () -> {
            productService.getProduct(3L);
        });
    }

    @Test
    void registerProduct() {
        
        when(productRepository.save(product1)).thenReturn(product1);
        
        String result = productService.registerProduct(form1, null);
        
        assertEquals("물품 등록을 완료하였습니다.", result);
    }

    @Test
    void deleteProduct() {

        when(productRepository.findByIdAndIsDeletedFalse(1L)).thenReturn(java.util.Optional.of(product1));
        
        String result = productService.deleteProduct(1L);
        
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
