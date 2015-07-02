package br.com.quemvai.db.util;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface JpaCustomRepository<T, Serializable> extends JpaRepository<T, Long>, JpaSpecificationExecutor<T> {

}