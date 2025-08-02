using TaskManagementApi.Models.DTOs;

namespace TaskManagementApi.Services
{
    public interface IAuthService
    {
        Task<UserDto> RegisterAsync(UserRegistrationDto userRegistrationDto);
        Task<UserDto> LoginAsync(UserLoginDto userLoginDto);
    }
}