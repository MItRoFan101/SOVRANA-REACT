package com.sovrana.repository;

import com.sovrana.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryAndAvailableTrue(String category);
    List<Product> findByAvailableTrue();
}