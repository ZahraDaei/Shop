using Shop.Application.Common.Mappings;
using Shop.Domain.Entities;

namespace Shop.Application.Addressess.Queries.GetUserAddressList
{
    public class UserAddressListDto : IMapFrom<Address>
    {
        public long Id { get; set; }
        public string City { get; set; }
        public string AddressDetail { get; set; }
        public string Number { get; set; }
    }
}