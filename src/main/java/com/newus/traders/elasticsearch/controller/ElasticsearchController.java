// /**
//  * @author wheesunglee
//  * @create date 2023-09-27 11:00:20
//  * @modify date 2023-10-12 14:09:31
//  */

// package com.newus.traders.elasticsearch.controller;

// import java.util.List;
// import java.util.Map;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.newus.traders.elasticsearch.service.ElasticsearchService;

// import lombok.RequiredArgsConstructor;

// @RestController
// @RequiredArgsConstructor
// @RequestMapping("/api")
// public class ElasticsearchController {

//     private final ElasticsearchService elasticsearchService;

//     @GetMapping("/search")
//     public ResponseEntity<Map<String, List<?>>> getSearchResults() {
//         Map<String, List<?>> map = elasticsearchService.getSearchResults("corgi");
//         return ResponseEntity.ok(elasticsearchService.getSearchResults("corgi"));
//     }

// }