/**
 * @author jeongyearim
 * @create date 2023-10-06 15:32:19
 * @modify date 2023-10-06 15:32:19
 */
package com.newus.traders.sns.repository;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.newus.traders.sns.dto.SnsDto;
import com.newus.traders.sns.entity.Sns;

public interface SnsRepository extends JpaRepository<Sns, Long>{
    
    // // 가장 최근의 데이터를 가져오는 사용자 정의 쿼리 메서드
    // @Query("SELECT s FROM Sns s ORDER BY s.createdDate DESC")
    // Sns findLatestSnsData();
    
    @Query("SELECT * FROM (SELECT s FROM Sns s ORDER BY s.createdDate DESC) WHERE ROWNUM <= 1")
    Sns findTopByOrderByCreatedDateDesc();


    Sns findTopByTagsOrderByCreatedDateDesc(@Param("tag") String tag);
}