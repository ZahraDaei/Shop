using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Shop.Application.Addresses.Commands.CreateAddress;
using Shop.Application.Addressess.Queries.GetUserAddressList;
using Shop.Application.Products.Commands.UpdateAddress;
using System.Threading.Tasks;

namespace Shop.WebUI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AddressController : ApiControllerBase
    {

        
        private readonly ILogger<AddressController> _logger;
        private readonly IMapper _mapper;

        public AddressController(ILogger<AddressController> logger,
            IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("GetUserAddressList")]
        public async Task<UserAddressListVm> GetUserAddressList()
        {
            return await Mediator.Send(new GetUserAddressListQuery() );
        }

        [HttpPost]
        public async Task<ActionResult<long>> Create([FromForm] CreateAddressCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut]
        public async Task<ActionResult<long>> Update([FromForm] UpdateAddressCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
