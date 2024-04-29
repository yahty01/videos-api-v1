// Определение перечисления для доступных разрешений видео
export enum Resolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160"
}

// Определение интерфейса для видео
export interface Video {
    id: number; // ID видео, integer тип
    title: string; // Название видео, обязательный параметр
    author: string; // Автор видео, обязательный параметр
    canBeDownloaded: boolean; // Возможность скачивания, по умолчанию false
    minAgeRestriction: number | null; // Ограничение по возрасту, может быть null
    createdAt: string; // Дата создания, строка в формате даты и времени
    publicationDate: string; // Дата публикации, строка в формате даты и времени
    availableResolutions: Resolutions[] | null; // Доступные разрешения, могут быть nullable
}

// Создание массива объектов Video
export const videos: Video[] = [
    {
        id: 1,
        title: "Exploring TypeScript",
        author: "Jane Doe",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: [Resolutions.P144, Resolutions.P720]
    },
    {
        id: 2,
        title: "Advanced JavaScript",
        author: "John Smith",
        canBeDownloaded: false,
        minAgeRestriction: 16,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: [Resolutions.P360, Resolutions.P1080]
    },
    {
        id: 3,
        title: "Understanding Enums",
        author: "Alice Johnson",
        canBeDownloaded: false,
        minAgeRestriction: 12,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        availableResolutions: [Resolutions.P240, Resolutions.P1440, Resolutions.P2160]
    }
];
