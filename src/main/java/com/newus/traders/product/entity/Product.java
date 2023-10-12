/**
 * @author wheesunglee
 * @create date 2023-09-19 08:21:17
 * @modify date 2023-10-06 18:50:37
 */
package com.newus.traders.product.entity;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.newus.traders.product.form.ProductForm;
import com.newus.traders.product.type.ProductStatus;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // @ManyToOne
    // @JsonBackReference
    // private UserEntity seller;

    private String name;

    private Long price;

    private String description;

    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    private double latitude;

    private double longitude;

    private String category;

    @CreationTimestamp
    private Timestamp createdAt;

    @UpdateTimestamp
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Image> images;

    private Long likes;

    private boolean isDeleted;

    @Builder
    public Product(ProductForm productForm) {
        this.name = productForm.getName();
        this.price = productForm.getPrice();
        this.description = productForm.getDescription();
        this.status = ProductStatus.AVAILABLE;
        this.latitude = productForm.getLatitude();
        this.longitude = productForm.getLongitude();
        this.category = productForm.getCategory();
        this.likes = 0L;
        this.isDeleted = false;

    }

    public void updateProduct(ProductForm productForm) {
        this.name = productForm.getName();
        this.price = productForm.getPrice();
        this.description = productForm.getDescription();
        this.latitude = productForm.getLatitude();
        this.longitude = productForm.getLongitude();
        this.category = productForm.getCategory();
    }

    public void purchaseProduct() {
        this.status = ProductStatus.SOLD;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }

    public void setIsDeleted() {
        this.isDeleted = true;
    }

}