package com.laras.repository;

import com.laras.entity.RestaurantInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantInfoRepository extends JpaRepository<RestaurantInfo, Long> {

    default Optional<RestaurantInfo> getInfo() {
        return findAll().stream().findFirst();
    }
}
