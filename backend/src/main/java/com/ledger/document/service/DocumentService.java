package com.ledger.document.service;

import com.ledger.common.enums.DocumentType;
import com.ledger.common.enums.VerificationStatus;
import com.ledger.common.exception.FileStorageException;
import com.ledger.common.exception.ResourceNotFoundException;
import com.ledger.document.entity.Document;
import com.ledger.document.repository.DocumentRepository;
import com.ledger.loan.entity.Loan;
import com.ledger.loan.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository documentRepository;
    private final LoanRepository loanRepository;

    @Value("${app.file.upload-dir}")
    private String uploadDir;

    public Document uploadDocument(Long loanId, MultipartFile file, DocumentType type) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        try {
            Path dirPath = Paths.get(uploadDir);
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }

            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = dirPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String checksum = calculateChecksum(file.getBytes());

            Document doc = new Document();
            doc.setLoan(loan);
            doc.setDocumentType(type);
            doc.setFileName(filename);
            doc.setFilePath(filePath.toString());
            doc.setContentType(file.getContentType());
            doc.setFileSize(file.getSize());
            doc.setChecksum(checksum);
            doc.setVerificationStatus(VerificationStatus.PENDING);

            return documentRepository.save(doc);
        } catch (Exception e) {
            throw new FileStorageException("Could not store file", e);
        }
    }

    public List<Document> getDocumentsByLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
        return documentRepository.findByLoan(loan);
    }

    public Resource downloadDocument(Long documentId) {
        try {
            Document doc = documentRepository.findById(documentId)
                    .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
            Path filePath = Paths.get(doc.getFilePath());
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileStorageException("File not found");
            }
        } catch (Exception e) {
            throw new FileStorageException("Could not read file", e);
        }
    }

    public void verifyDocument(Long documentId, VerificationStatus status) {
        Document doc = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        doc.setVerificationStatus(status);
        documentRepository.save(doc);
    }

    private String calculateChecksum(byte[] data) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(data);
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
