﻿using System.ComponentModel.DataAnnotations;

namespace TaskManagementApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? Username { get; set; }

        [Required]
        public string? PasswordHash { get; set; }

        [Required]
        public string? PasswordSalt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property
        public ICollection<UserTask>? Tasks { get; set; }
    }
}