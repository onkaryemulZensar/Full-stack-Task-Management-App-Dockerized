using TaskManagementApi.Models;

namespace TaskManagementApi.Interfaces
{
    public interface ITaskRepository
    {
        Task<IEnumerable<UserTask>> GetAllForUserAsync(int userId);
        Task<UserTask> GetByIdAsync(int id, int userId);
        Task AddAsync(UserTask task);
        void Update(UserTask task);
        void Delete(UserTask task);
        Task<bool> SaveChangesAsync();
    }
}