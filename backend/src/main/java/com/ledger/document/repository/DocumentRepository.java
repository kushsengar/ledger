package com.ledger.document.repository;

import com.ledger.document.entity.Document;
import com.ledger.loan.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByLoan(Loan loan);
}
