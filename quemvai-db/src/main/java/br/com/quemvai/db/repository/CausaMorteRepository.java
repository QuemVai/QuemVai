package br.com.quemvai.db.repository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import br.com.quemvai.db.model.CausaMorte;
import br.com.quemvai.db.util.JpaCustomRepository;

@RepositoryRestResource(collectionResourceRel = "causamorte", path = "causamorte")
public interface CausaMorteRepository extends JpaCustomRepository<CausaMorte, Long>, CausaMorteRepositoryCustom {

}
