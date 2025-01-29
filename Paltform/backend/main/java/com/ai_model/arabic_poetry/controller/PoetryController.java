package com.ai_model.arabic_poetry.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/poetry")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PoetryController {

//    private final FeedbackRepository feedbackRepository;
//
//    public PoetryController(FeedbackRepository feedbackRepository) {
//        this.feedbackRepository = feedbackRepository;
//    }

    private final String PYTHON_API_URL = "http://python-api:5000";

    @PostMapping("/classify")
    public ResponseEntity<?> classifyPoetry(@RequestBody Map<String, String> payload) {
        String text = payload.get("text");
        if (text == null || text.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Text input is empty.");
        }
        RestTemplate restTemplate = new RestTemplate();
        try {
            Map<String, Object> response = restTemplate.postForObject(PYTHON_API_URL + "/classify", payload, Map.class);
            return ResponseEntity.ok(response);
        } catch (HttpServerErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body("Python API Error: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadModel(@RequestParam("file") MultipartFile file) {
        System.out.println("Received request to upload file.");
        try {
            String fileName = file.getOriginalFilename();
            System.out.println("File name: " + fileName);

            if (fileName == null || !fileName.endsWith(".keras")) {
                System.out.println("Invalid file type.");
                return ResponseEntity.badRequest().body("Invalid file. Please upload a .keras file.");
            }

            Path sharedModelsPath = Paths.get("/app/models");

            Files.createDirectories(sharedModelsPath);

            Files.copy(file.getInputStream(), sharedModelsPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

            System.out.println("File uploaded successfully to " + sharedModelsPath);
            return ResponseEntity.ok("File uploaded successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/list-files")
    public ResponseEntity<?> listFilesInModelsDirectory() {
        try {
            Path modelsPath = Paths.get("/app/models");
            List<String> files = Files.walk(modelsPath, 1)
                    .filter(Files::isRegularFile)
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(files);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error reading files: " + e.getMessage());
        }
    }

//    @PostMapping("/feedback")
//    public ResponseEntity<?> submitFeedback(@RequestBody Map<String, String> payload) {
//        String name = payload.get("name");
//        String feedbackContent = payload.get("feedback");
//
//        if (name == null || feedbackContent == null || name.trim().isEmpty() || feedbackContent.trim().isEmpty()) {
//            return ResponseEntity.badRequest().body("Name or feedback is empty.");
//        }
//
//        Feedback feedback = new Feedback();
//        feedback.setName(name);
//        feedback.setFeedback(feedbackContent);
//
//        feedbackRepository.save(feedback);
//
//        return ResponseEntity.ok("Feedback submitted successfully.");
//    }

    @GetMapping("/evaluate")
    public ResponseEntity<?> evaluateModel() {
        RestTemplate restTemplate = new RestTemplate();
        try {
            Map<String, Object> response = restTemplate.getForObject(PYTHON_API_URL + "/evaluate", Map.class);
            return ResponseEntity.ok(response);
        } catch (HttpServerErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body("Error from Python API: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }

//    @GetMapping("/health")
//    public ResponseEntity<?> healthCheck() {
//        return ResponseEntity.ok(Map.of("status", "healthy"));
//    }
}
