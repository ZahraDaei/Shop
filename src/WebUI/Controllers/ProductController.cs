using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shop.Application.Products.Commands.CreateProduct;
using Shop.ModelDTO;
using Shop.ModelVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.WebUI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ApiControllerBase
    {


        private readonly ILogger<ProductController> _logger;
       // private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductController(ILogger<ProductController> logger,
            //IApplicationDbContext context,
            IMapper mapper)
        {
            _logger = logger;
          //  _context = context;
            _mapper = mapper;
        }

        //[HttpGet]
        //public async Task<ProductVm> Get()
        //{
        //    return new ProductVm()
        //    {
        //        ProductDtos = await _context.Products
        //            .OrderBy(x => x.Id)
        //            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider).ToListAsync()
        //    };
        //}

        [HttpPost]
        public async Task<ActionResult<long>> Create([FromForm] CreateProductCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
