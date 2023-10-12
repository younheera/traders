/**
 * @author wheesunglee
 * @create date 2023-09-27 11:00:20
 * @modify date 2023-09-29 23:23:45
 */

package com.newus.traders.elasticsearch.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.newus.traders.elasticsearch.document.ProductDocument;
import com.newus.traders.elasticsearch.repository.ElasticsearchProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ElasticsearchService {

    private final ElasticsearchProductRepository elasticsearchProductRepository;

    public List<ProductDocument> getProduct(String keyword) {
        List<ProductDocument> productDocumentList = elasticsearchProductRepository.findByName(keyword);
        return productDocumentList;
    }

}
