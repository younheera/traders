/**
 * @author wheesunglee
 * @create date 2023-10-04 15:36:47
 * @modify date 2023-10-05 10:25:47
 */
package com.newus.traders.product.form;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRegisterForm {

    @NotBlank
    private String name;

    private Long price;

    @NotBlank
    private String description;

    @NotBlank
    private String category;

    private double latitude;

    private double longitude;

}
