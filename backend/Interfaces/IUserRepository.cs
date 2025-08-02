using TaskManagementApi.Models;

namespace TaskManagementApi.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(int id);
        Task<User> GetByUsernameAsync(string username);
        Task<bool> UserExistsAsync(string username);
        Task AddAsync(User user);
        Task SaveChangesAsync();
    }
}