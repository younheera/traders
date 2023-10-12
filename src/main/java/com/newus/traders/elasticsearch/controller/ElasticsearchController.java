/**
 * @author wheesunglee
 * @create date 2023-09-27 11:00:20
 * @modify date 2023-09-29 23:22:15
 */

package com.newus.traders.elasticsearch.controller;

import com.newus.traders.elasticsearch.document.ProductDocument;
import com.newus.traders.elasticsearch.service.ElasticsearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ElasticsearchController {

    private final ElasticsearchService elasticsearchService;

    @GetMapping("/search")
    public ResponseEntity<List<ProductDocument>> getProducts() {

        // elasticsearchService.saveProduct();
        return ResponseEntity.ok(elasticsearchService.getProduct("test"));
    }

}
