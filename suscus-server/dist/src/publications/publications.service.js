"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PublicationsService = class PublicationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPublications(query) {
        let publications;
        try {
            const filters = {};
            if (query?.artist_id) {
                const artistId = parseInt(query.artist_id);
                if (!isNaN(artistId)) {
                    filters.artist_id = artistId;
                }
                else {
                    throw new Error('Invalid artist_id');
                }
            }
            if (query?.id) {
                const id = parseInt(query.id);
                if (!isNaN(id)) {
                    filters.id = id;
                }
                else {
                    throw new Error('Invalid id');
                }
            }
            if (query?.title) {
                filters.title = { contains: query.title, mode: 'insensitive' };
            }
            if (query?.categories) {
                const categoryIds = Array.isArray(query.categories)
                    ? query.categories
                        .map((id) => parseInt(id))
                        .filter((id) => !isNaN(id))
                    : query.categories
                        .split(',')
                        .map((id) => parseInt(id))
                        .filter((id) => !isNaN(id));
                if (categoryIds.length > 0) {
                    filters.publication_categories = {
                        some: {
                            category_id: { in: categoryIds },
                        },
                    };
                }
            }
            publications = await this.prisma.publications.findMany({
                where: filters,
                include: {
                    publication_categories: true,
                },
            });
            return publications;
        }
        catch (e) {
            console.error('getPublications Error:', e.message);
            return null;
        }
    }
    async createPublication(data) {
        const publication = await this.prisma.publications.create({
            data: {
                artist_id: data.artist_id,
                title: data.title,
                image_url: data.image_url,
                description: data.description ? data.cdescriptionategory_id : null,
            },
        });
        if (data.categories.length > 0) {
            for (const id of data.categories) {
                await this.prisma.publication_categories.create({
                    data: {
                        publication_id: publication.id,
                        category_id: id,
                    },
                });
            }
        }
        return publication;
    }
    async updatePublication(data) {
        return await this.prisma.publications.update({
            where: { id: data.id },
            data: { description: data.description },
        });
    }
    async deletePublication(query) {
        try {
            const resp = this.prisma.publications.delete({
                where: { id: parseInt(query.id) },
            });
            return resp;
        }
        catch (e) {
            return e;
        }
    }
};
exports.PublicationsService = PublicationsService;
exports.PublicationsService = PublicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicationsService);
//# sourceMappingURL=publications.service.js.map