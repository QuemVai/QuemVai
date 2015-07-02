package br.com.quemvai.db.repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.quemvai.db.model.CausaMorte;

public class CausaMorteRepositoryImpl implements CausaMorteRepositoryCustom {

	@Autowired
	EntityManager entityManager;

	public CausaMorte buscaAleatoria() {
		String jpql = "FROM CausaMorte ORDER BY RANDOM()";
		TypedQuery<CausaMorte> query = entityManager.createQuery(jpql, CausaMorte.class);
		query.setMaxResults(1);
		return query.getSingleResult();
	}

}
