using MediatR;
using Newtonsoft.Json;
using Shop.Application.Categories.Queries.GetCategory;
using Shop.Application.Common.Interfaces;
using Shop.Application.Common.Models;
using Shop.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.Addresses.Commands.CreateAddress
{
    public class CreateAddressCommand : IRequest<long>
    {
        public string City { get; set; }
        public string AddressDetail { get; set; }
        public string Number { get; set; }
        public string UserId { get; set; }
    }

    public class CreateAddressCommandHandler : IRequestHandler<CreateAddressCommand, long>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;

        public CreateAddressCommandHandler(IApplicationDbContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        public async Task<long> Handle(CreateAddressCommand request, CancellationToken cancellationToken)
        {
            var entity = new Address()
            {
                AddressDetail = request.AddressDetail,
                ApplicationUserId=request.UserId,
                City=request.City,
                Number=request.Number
            };

            _context.Addresses.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}

