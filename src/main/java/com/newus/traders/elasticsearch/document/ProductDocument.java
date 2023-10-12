/**
 * @author wheesunglee
 * @create date 2023-09-27 11:00:15
 * @create date 2023-09-27 11:00:15
 */

package com.newus.traders.elasticsearch.document;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.Id;

@Document(indexName = "nori_product")
@Getter
@Setter
public class ProductDocument {
    @Id
    private String id;

}
