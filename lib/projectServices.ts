import { getDatabase } from './dbConnect';

export interface ProjectWithServices {
  _id: any;
  title: string;
  slug: string;
  coverImage?: string;
  description: string;
  clientName: string;
  services: {
    _id: any;
    name: string;
    slug: string;
    description: string;
    icon: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  completedDate: Date;
  location: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectNavigation {
  title: string;
  slug: string;
}

export interface ProjectWithRelations {
  project: ProjectWithServices;
  prev: ProjectNavigation | null;
  next: ProjectNavigation | null;
  related: ProjectWithServices[];
}

// Get all projects with services populated
export async function getAllProjects(): Promise<ProjectWithServices[]> {
  try {
    const db = await getDatabase();
    const projects = await db.collection('projects')
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'services',
            foreignField: '_id',
            as: 'services',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: 1,
                  slug: 1,
                  description: 1,
                  icon: 1,
                  active: 1,
                  createdAt: 1,
                  updatedAt: 1
                }
              }
            ]
          }
        },
        {
          $sort: { completedDate: -1 }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            slug: 1,
            coverImage: 1,
            logo: 1,
            description: 1,
            clientName: 1,
            services: 1,
            completedDate: 1,
            location: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1
          }
        }
      ])
      .toArray();

    return projects as ProjectWithServices[];
  } catch (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }
}

// Get project by slug with services populated
export async function getProjectBySlug(slug: string): Promise<ProjectWithRelations | null> {
  try {
    const db = await getDatabase();
    
    // Get the main project
    const project = await db.collection('projects')
      .aggregate([
        {
          $match: { slug: slug }
        },
        {
          $lookup: {
            from: 'services',
            localField: 'services',
            foreignField: '_id',
            as: 'services',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: 1,
                  slug: 1,
                  description: 1,
                  icon: 1,
                  active: 1,
                  createdAt: 1,
                  updatedAt: 1
                }
              }
            ]
          }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            slug: 1,
            coverImage: 1,
            description: 1,
            clientName: 1,
            services: 1,
            completedDate: 1,
            location: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1
          }
        }
      ])
      .toArray();

    if (!project || project.length === 0) {
      return null;
    }

    const mainProject = project[0] as ProjectWithServices;

    // Get previous and next projects
    const prevProject = await db.collection('projects')
      .find({
        completedDate: { $lt: mainProject.completedDate }
      })
      .sort({ completedDate: -1 })
      .limit(1)
      .project({ title: 1, slug: 1 })
      .toArray();

    const nextProject = await db.collection('projects')
      .find({
        completedDate: { $gt: mainProject.completedDate }
      })
      .sort({ completedDate: 1 })
      .limit(1)
      .project({ title: 1, slug: 1 })
      .toArray();

    // Get related projects (excluding current project, limited to 3)
    const relatedProjects = await db.collection('projects')
      .find({
        _id: { $ne: mainProject._id },
        completedDate: { $lte: mainProject.completedDate }
      })
      .sort({ completedDate: -1 })
      .limit(3)
      .toArray();

    // Populate services for related projects
    const relatedWithServices = await Promise.all(
      relatedProjects.map(async (relatedProject: any) => {
        const services = await db.collection('services')
          .find({
            _id: { $in: relatedProject.services || [] }
          })
          .project({
            _id: 1,
            name: 1,
            slug: 1,
            description: 1,
            icon: 1,
            active: 1,
            createdAt: 1,
            updatedAt: 1
          })
          .toArray();

        return {
          ...relatedProject,
          services
        } as ProjectWithServices;
      })
    );

    return {
      project: mainProject,
      prev: prevProject.length > 0 ? prevProject[0] as ProjectNavigation : null,
      next: nextProject.length > 0 ? nextProject[0] as ProjectNavigation : null,
      related: relatedWithServices
    };
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    throw error;
  }
}

// Get all services
export async function getAllServices() {
  try {
    const db = await getDatabase();
    const services = await db.collection('services')
      .find({ active: true })
      .sort({ name: 1 })
      .toArray();

    return services;
  } catch (error) {
    console.error('Error fetching all services:', error);
    throw error;
  }
}

// Get projects by service
export async function getProjectsByService(serviceSlug: string): Promise<ProjectWithServices[]> {
  try {
    const db = await getDatabase();
    
    // First get the service by slug
    const service = await db.collection('services')
      .findOne({ slug: serviceSlug, active: true });
    
    if (!service) {
      return [];
    }

    // Then get projects that include this service
    const projects = await db.collection('projects')
      .aggregate([
        {
          $match: { services: service._id }
        },
        {
          $lookup: {
            from: 'services',
            localField: 'services',
            foreignField: '_id',
            as: 'services',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  name: 1,
                  slug: 1,
                  description: 1,
                  icon: 1,
                  active: 1,
                  createdAt: 1,
                  updatedAt: 1
                }
              }
            ]
          }
        },
        {
          $sort: { completedDate: -1 }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            slug: 1,
            coverImage: 1,
            description: 1,
            clientName: 1,
            services: 1,
            completedDate: 1,
            location: 1,
            content: 1,
            createdAt: 1,
            updatedAt: 1
          }
        }
      ])
      .toArray();

    return projects as ProjectWithServices[];
  } catch (error) {
    console.error('Error fetching projects by service:', error);
    throw error;
  }
}

// Helper function to get image URL for projects
export function getProjectImageUrl(coverImage?: string) {
  if (!coverImage) return '/images/projects/default-project.jpg';
  
  const baseUrl = 'https://agencyadmin.innothinklabs.com/';
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const imagePath = `/images/project-covers/${coverImage.replace(/^\//, '')}`;
  
  return `${cleanBaseUrl}${imagePath}`;
}
