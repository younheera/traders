/**
 * @author wheesunglee
 * @create date 2023-10-06 18:48:26
 * @modify date 2023-10-06 18:48:26
 */
package com.newus.traders.image.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.newus.traders.product.entity.Product;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JsonBackReference
    private Product product;


    String filename;

    String filepath;

    @Builder
    public Image(String filename) {

        this.filename = filename;
        this.filepath = "/files/" + filename;
    }

    public void setProduct(Product product) {

        this.product = product;
    }
}
