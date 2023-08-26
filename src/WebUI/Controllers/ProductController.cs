using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Shop.Application.ProductCategories.Queries.GetProductCategory;
using Shop.Application.Products.Commands.CreateProduct;
using Shop.Application.Products.Queries.GetProductList;
using System;
using System.IO;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace Shop.WebUI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ApiControllerBase
    {


        private readonly ILogger<ProductController> _logger;
        private readonly IMapper _mapper;

        public ProductController(ILogger<ProductController> logger,
            IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("GetProductCategoryList")]
        public async Task<ProductCategoryVm> GetProductCategoryList()
        {           

            return await Mediator.Send(new GetProductCategoryListQuery());

        }
        
        [HttpGet("ProductList")]
        public async Task<ProductVm> Getlist()
        {

            return await Mediator.Send(new GetProductListQuery());

        }     

        [HttpGet("GetProductById")]
        public async Task<ProductDto> GetProductById(long id)
        {

            return await Mediator.Send(new GetProductByIdQuery() { Id = id });

        }

        [HttpPost]
        public async Task<ActionResult<long>> Create([FromForm] CreateProductCommand command)
        {           
            
            return await Mediator.Send(command);
        }

        [HttpPut("UpdateProduct")]
        public async Task<ActionResult<long>> Update([FromForm] UpdateProductCommand command)
        {           
            
            return await Mediator.Send(command);
        }
        
        [HttpDelete("DeleteProduct")]
        public async Task<ActionResult> SoftDelete(long id)
        {           
            
             await Mediator.Send(new DeleteProductCommand() { Id=id} );
            return NoContent();
        }
    }
}
