package equipo124.redsocial.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    private String imageUrl;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public long getId() {
    	return this.id;
    }
    
    public void setId(long id) {
    	this.id = id;
    }
    
    public String getContent() {
    	return this.content;
    }
    
    public void setContent(String content) {
    	this.content = content;
    }
    
    public String getImageUrl() {
    	return this.imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
    	this.imageUrl = imageUrl;
    }
    
    public LocalDateTime getCreatedAt() {
    	return this.createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
    	this.createdAt = createdAt;
    }
    
    public User getUser() {
    	return this.user;
    }
    
    public void setUser(User user) {
    	this.user = user;
    }
}