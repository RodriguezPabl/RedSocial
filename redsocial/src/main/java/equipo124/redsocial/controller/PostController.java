package equipo124.redsocial.controller;

import equipo124.redsocial.model.Post;
import equipo124.redsocial.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;

import java.util.List;

@RestController
@RequestMapping("/redsocial/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Post> createPost(
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Authentication authentication
    ) {
        String username = authentication.getName();
        String imageUrl = null;

        if (image != null && !image.isEmpty()) {
            try {
                String uploadsDir = "uploads/";
                Path path = Paths.get(uploadsDir);
                if (!Files.exists(path)) {
                    Files.createDirectories(path);
                }

                String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path filePath = path.resolve(filename);
                Files.copy(image.getInputStream(), filePath);

                imageUrl = "/uploads/" + filename; // esta es la URL que servimos
            } catch (IOException e) {
                return ResponseEntity.status(500).body(null);
            }
        }

        Post post = postService.createPost(username, content, imageUrl);
        return ResponseEntity.ok(post);
    }


    @GetMapping
    public ResponseEntity<List<Post>> getPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }
}