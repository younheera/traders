/**
 * @author jeongyearim
 * @create date 2023-10-12 11:43:41
 * @modify date 2023-10-12 11:43:41
 */
package com.newus.traders.sns.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newus.traders.sns.entity.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, Integer>{
    
}
