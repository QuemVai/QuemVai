package br.com.quemvai.db.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.quemvai.db.model.CausaMorte;
import br.com.quemvai.db.repository.CausaMorteRepository;

@RestController
@RequestMapping("causamorte")
public class CausaMorteController {

	@Autowired
	CausaMorteRepository causaMorteRepository;

	@RequestMapping("search/buscaAleatoria")
	public CausaMorte buscaAleatoria() {
		return causaMorteRepository.buscaAleatoria();
	}

}
