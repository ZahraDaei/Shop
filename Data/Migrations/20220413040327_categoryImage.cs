using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Store.Data.Migrations
{
    public partial class categoryImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategory_Categories_CategoryId",
                table: "ProductCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategory_Products_ProductId",
                table: "ProductCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductSpecification_Products_ProductId",
                table: "ProductSpecification");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductSpecification_Specification_SpecificationId",
                table: "ProductSpecification");

            migrationBuilder.DropForeignKey(
                name: "FK_Specification_Categories_CategoryId",
                table: "Specification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Specification",
                table: "Specification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductSpecification",
                table: "ProductSpecification");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCategory",
                table: "ProductCategory");

            migrationBuilder.RenameTable(
                name: "Specification",
                newName: "Specifications");

            migrationBuilder.RenameTable(
                name: "ProductSpecification",
                newName: "ProductSpecifications");

            migrationBuilder.RenameTable(
                name: "ProductCategory",
                newName: "ProductCategories");

            migrationBuilder.RenameIndex(
                name: "IX_Specification_CategoryId",
                table: "Specifications",
                newName: "IX_Specifications_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductSpecification_SpecificationId",
                table: "ProductSpecifications",
                newName: "IX_ProductSpecifications_SpecificationId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductSpecification_ProductId",
                table: "ProductSpecifications",
                newName: "IX_ProductSpecifications_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategory_ProductId",
                table: "ProductCategories",
                newName: "IX_ProductCategories_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategory_CategoryId",
                table: "ProductCategories",
                newName: "IX_ProductCategories_CategoryId");

            migrationBuilder.AddColumn<byte[]>(
                name: "Content",
                table: "Categories",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Specifications",
                table: "Specifications",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductSpecifications",
                table: "ProductSpecifications",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCategories",
                table: "ProductCategories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategories_Categories_CategoryId",
                table: "ProductCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategories_Products_ProductId",
                table: "ProductCategories",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSpecifications_Products_ProductId",
                table: "ProductSpecifications",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSpecifications_Specifications_SpecificationId",
                table: "ProductSpecifications",
                column: "SpecificationId",
                principalTable: "Specifications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Specifications_Categories_CategoryId",
                table: "Specifications",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategories_Categories_CategoryId",
                table: "ProductCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductCategories_Products_ProductId",
                table: "ProductCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductSpecifications_Products_ProductId",
                table: "ProductSpecifications");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductSpecifications_Specifications_SpecificationId",
                table: "ProductSpecifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Specifications_Categories_CategoryId",
                table: "Specifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Specifications",
                table: "Specifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductSpecifications",
                table: "ProductSpecifications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCategories",
                table: "ProductCategories");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "Specifications",
                newName: "Specification");

            migrationBuilder.RenameTable(
                name: "ProductSpecifications",
                newName: "ProductSpecification");

            migrationBuilder.RenameTable(
                name: "ProductCategories",
                newName: "ProductCategory");

            migrationBuilder.RenameIndex(
                name: "IX_Specifications_CategoryId",
                table: "Specification",
                newName: "IX_Specification_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductSpecifications_SpecificationId",
                table: "ProductSpecification",
                newName: "IX_ProductSpecification_SpecificationId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductSpecifications_ProductId",
                table: "ProductSpecification",
                newName: "IX_ProductSpecification_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategories_ProductId",
                table: "ProductCategory",
                newName: "IX_ProductCategory_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCategories_CategoryId",
                table: "ProductCategory",
                newName: "IX_ProductCategory_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Specification",
                table: "Specification",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductSpecification",
                table: "ProductSpecification",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCategory",
                table: "ProductCategory",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategory_Categories_CategoryId",
                table: "ProductCategory",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductCategory_Products_ProductId",
                table: "ProductCategory",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSpecification_Products_ProductId",
                table: "ProductSpecification",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSpecification_Specification_SpecificationId",
                table: "ProductSpecification",
                column: "SpecificationId",
                principalTable: "Specification",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Specification_Categories_CategoryId",
                table: "Specification",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
