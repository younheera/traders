/**
 * @author wheesunglee
 * @create date 2023-09-19 08:18:21
 * @modify date 2023-09-23 18:36:36
 */
package com.newus.traders.product.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.newus.traders.product.dto.ProductDto;
import com.newus.traders.product.service.ProductService;
import com.newus.traders.product.type.Coordinates;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    /*
      Response Entity
      - 여태까지 했던 반환은 응답의 body부분에만 데이터를 넣는 것,
      - Response Entity를 사용해서 상태코드(404, 200, 500)과 컨텐츠 유형(json, text/html) 등이 있는 헤더
      정보와 body를 같이 보낼 수 있음
      
      
      1. 컨트롤러에서 반환 타입을 ResponseEntity로 한번 더 묶어주기
      예) List를 반환하면 ResponseEntity<List<Object>>
      
      2. return 후 ResponseEntity.ok(반환값)
      -여기서 ok는 200 상태 코드

     */

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {

        return ResponseEntity.ok(productService.getAllProducts());
    }

    
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable("id") Integer id) {

        return ResponseEntity.ok(productService.getProduct(id));
    }
        


    /**
    * @author jeongyearim
    * @create date 2023-09-26 13:41:14
    * @modify date 2023-09-26 13:41:14
    * @desc [프론트단에서 받아온 위도,경도를 확인]
    */
    @PostMapping("/sendCoordinates")
    public ResponseEntity<String> receiveCoordinates(@RequestBody Coordinates coordinates) {
        double latitude = coordinates.getLatitude();
        double longitude = coordinates.getLongitude();

        // 여기에서 위도와 경도 데이터를 활용하여 원하는 작업을 수행합니다.
        System.out.println("받은 위도: " + latitude);
        System.out.println("받은 경도: " + longitude);

        return ResponseEntity.ok("데이터가 성공적으로 수신되었습니다.");
    }

}