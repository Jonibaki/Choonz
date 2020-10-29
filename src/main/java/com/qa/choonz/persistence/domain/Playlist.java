package com.qa.choonz.persistence.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@JsonIgnoreProperties(value = { "tracks" })
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(unique = true)
    private String name;

    @NotNull
    @Size(max = 500)
    @Column(unique = true)
    private String description;

    @NotNull
    @Size(max = 1000)
    @Column(unique = true)
    private String artwork;

//    @OneToMany(mappedBy = "playlist", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JsonManagedReference(value = "playlist")
//    private List<Track> tracks = new ArrayList<>();
    @ManyToMany(mappedBy = "playlist")
    private List<Track> tracks = new ArrayList<>();

    @ManyToOne
    @JsonBackReference(value = "users")
    private Users users;

    public Playlist() {
        super();
        // TODO Auto-generated constructor stub
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Playlist(Long id, @NotNull @Size(max = 100) String name, @NotNull @Size(max = 500) String description,
                    @NotNull @Size(max = 1000) String artwork, List<Track> tracks, Users users) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.artwork = artwork;
		this.tracks = tracks;
		this.users = users;
	}

	public Playlist(Long id, @NotNull @Size(max = 100) String name, @NotNull @Size(max = 500) String description,
            @NotNull @Size(max = 1000) String artwork, List<Track> tracks) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.artwork = artwork;
        this.tracks = tracks;
    }

    public Playlist(@NotNull @Size(max = 100) String name) {
		super();
		this.name = name;
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Playlist(@NotNull @Size(max = 100) String name, @NotNull @Size(max = 500) String description, @NotNull @Size(max = 1000) String artwork) {
        this.name = name;
        this.description = description;
        this.artwork = artwork;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getArtwork() {
        return artwork;
    }

    public void setArtwork(String artwork) {
        this.artwork = artwork;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

    @Override
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("Playlist [id=").append(id).append(", name=").append(name).append(", description=")
                .append(description).append(", artwork=").append(artwork).append(", tracks=").append(tracks)
                .append("]");
        return builder.toString();
    }

    @Override
    public int hashCode() {
        return Objects.hash(artwork, description, id, name, tracks, users);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof Playlist)) {
            return false;
        }
        Playlist other = (Playlist) obj;
        return Objects.equals(artwork, other.artwork) && Objects.equals(description, other.description)
                && id == other.id && Objects.equals(name, other.name) && Objects.equals(tracks, other.tracks)
                && Objects.equals(users, other.users);
    }

}
