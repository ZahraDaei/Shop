using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Shop.Application.Users.Queries.GetUser;
using System.Threading.Tasks;

namespace Shop.WebUI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ApiControllerBase
    {


        private readonly ILogger<UserController> _logger;
        private readonly IMapper _mapper;

        public UserController(ILogger<UserController> logger,
            IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<UserVm> Get()
        {

            return await Mediator.Send(new GetUserQuery());

        }

 
        
        //[HttpGet("ProductList")]
        //public async Task<ProductVm> Getlist()
        //{

        //    return await Mediator.Send(new GetProductListQuery());

        //}

        //[HttpPost]
        //public async Task<ActionResult<long>> Create([FromForm] CreateProductCommand command)
        //{
        //    return await Mediator.Send(command);
        //}
    }
}
