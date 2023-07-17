using MediatR;
using Microsoft.EntityFrameworkCore;
using Shop.Application.Common.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.Products.Commands.UpdateAddress
{
    public class UpdateAddressCommand : IRequest<long>
    {
        public long id { get; set; }
        public string City { get; set; }
        public string AddressDetail { get; set; }
        public string Number { get; set; }
    }

    public class UpdateAddressCommandHandler : IRequestHandler<UpdateAddressCommand, long>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;

        public UpdateAddressCommandHandler(IApplicationDbContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        public async Task<long> Handle(UpdateAddressCommand request, CancellationToken cancellationToken)
        {
            var address = await _context.Addresses.Where(a=>a.Id==request.id).FirstOrDefaultAsync();
            address.AddressDetail = request.AddressDetail;
            address.Number = request.Number;
            address.City = request.City;
            await _context.SaveChangesAsync(cancellationToken);

           

            return address.Id;
        }
    }
}

