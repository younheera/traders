/**
 * @author wheesunglee
 * @create date 2023-09-27 11:00:20
 * @modify date 2023-10-12 14:09:55
 */

package com.newus.traders.elasticsearch.service;

import com.newus.traders.elasticsearch.document.ProductDocument;
import com.newus.traders.elasticsearch.repository.ElasticsearchProductRepository;
import com.newus.traders.product.dto.ProductDto;
import com.newus.traders.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ElasticsearchService {

    private final ElasticsearchProductRepository elasticsearchProductRepository;
    private final ProductService productService;

    public List<ProductDto> getSearchResults(String keyword) {

        List<ProductDocument> productDocumentList = elasticsearchProductRepository.findByName(keyword);

        List<Long> productIdList = productDocumentList.stream()
                .map(productDocument -> productDocument.getId())
                .collect(Collectors.toList());

        List<ProductDto> productDtoList = productService.getSearchedProducts(productIdList);

        return productDtoList;
    }

}
