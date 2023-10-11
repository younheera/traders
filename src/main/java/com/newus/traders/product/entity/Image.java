/**
 * @author wheesunglee
 * @create date 2023-10-06 18:48:26
 * @modify date 2023-10-06 18:48:26
 */
package com.newus.traders.product.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.newus.traders.user.entity.UserEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    // @OneToOne
    // @JsonBackReference
    // private UserEntity user;

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
