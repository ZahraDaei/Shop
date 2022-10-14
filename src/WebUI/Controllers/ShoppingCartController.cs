using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Shop.Application.CartProducts.Commands.CreateCartProduct;
using Shop.Application.CartProducts.Commands.DeleteCartProduct;
using Shop.Application.CartProducts.Queries.GetCartProducts;
using Shop.Application.Categories.Commands.CreateCategory;
using Shop.Application.Categories.Queries.GetCategory;
using Shop.Application.Common.Interfaces;
using Shop.Application.Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.WebUI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ShoppingCartController : ApiControllerBase
    {


        private readonly ILogger<ShoppingCartController> _logger;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ShoppingCartController(ILogger<ShoppingCartController> logger, IApplicationDbContext context, IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
        }

      
        [HttpGet("GetCartProductList")]
        public async Task<CartProductVm> GetCartProductList()
        {
            return await Mediator.Send(new GetCartProductListQuery());

        }
        [HttpPost("createCartProduct")]
        public async Task<ActionResult<long>> Create(CreateCartProductCommand command)
        {
            return await Mediator.Send(command);
        } 
        
        [HttpDelete("deleteCartProduct")]
        public async Task<ActionResult<Unit>> Delete(DeleteCartProductCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
