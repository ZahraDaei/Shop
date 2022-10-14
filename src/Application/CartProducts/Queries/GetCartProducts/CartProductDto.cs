using AutoMapper;
using Shop.Application.Common.Mappings;
using Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.CartProducts.Queries.GetCartProducts
{
    public class CartProductDto : IMapFrom<CartProduct>
    {
        public long Id { get; set; }
        public int Amount { get; set; }
        public long ProductId { get; set; }
        public string BrandName { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }

        public void Mapping(Profile profile) {
            profile.CreateMap<CartProduct, CartProductDto>().ForMember(des => des.BrandName, s => s.MapFrom(s => s.Product.BrandName));
            profile.CreateMap<CartProduct, CartProductDto>().ForMember(des => des.Description, s => s.MapFrom(s => s.Product.Description));
            profile.CreateMap<CartProduct, CartProductDto>().ForMember(des => des.ShortDescription, s => s.MapFrom(s => s.Product.ShortDescription));
            profile.CreateMap<CartProduct, CartProductDto>().ForMember(des => des.Name, s => s.MapFrom(s => s.Product.Name));
            profile.CreateMap<CartProduct, CartProductDto>().ForMember(des => des.FarsiName, s => s.MapFrom(s => s.Product.FarsiName));
            profile.CreateMap<CartProduct, CartProductDto>().ForMember(des => des.Price, s => s.MapFrom(s => s.Product.Price));
            profile.CreateMap<CartProduct, CartProductDto>().ForMember(des => des.Image, s => s.MapFrom(s => s.Product.Image));
        }
    }
}
