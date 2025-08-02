using TaskManagementApi.Models.DTOs;

namespace TaskManagementApi.Interfaces
{
    public interface IAuthService
    {
        Task<UserDto> RegisterAsync(UserRegistrationDto userRegistrationDto);
        Task<UserDto> LoginAsync(UserLoginDto userLoginDto);
    }
}