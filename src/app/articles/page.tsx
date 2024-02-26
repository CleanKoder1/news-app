import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TArticles } from '@/types/types'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const getArticles = async (keyword: string) => {
    try {
        if (!keyword) return null

        const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${process.env.API_KEY_NEWS_API}&pageSize=5`)
        if (data.status !== "ok") throw new Error("Failed to fetch data")
        return data.articles
    } catch (error) {
        console.error(error)
    }
}

const Articles = async ({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}) => {
    const keyword = searchParams && typeof searchParams.keyword === "string" ? searchParams.keyword : "";
    const articles: Array<TArticles> = await getArticles(keyword)
    return (
        <div className="container min-h-screen h-auto mx-auto px-4 py-12">
            <h1 className='font-bold text-2xl mb-6'>More about "{keyword}"</h1>
            <div className="flex flex-wrap ">
                <div className="w-full lg:w-3/4">
                    <div className="flex flex-col gap-3">
                        {/*CARD */}
                        {
                            articles && articles.length > 0 ? articles.map((article) => (

                                <Link href={article.url} key={article.url} legacyBehavior>
                                    <a target="_blank">
                                        <div className="flex gap-1 rounded-lg overflow-hidden w-3/4 min-h-30 h-auto">
                                            <div className="w-full h-30 relative">
                                                <Image
                                                    fill
                                                    loading='lazy'
                                                    src={article.urlToImage ? article.urlToImage : "https://th.bing.com/th/id/OIP.3vwSl2HNBnDvKieP-hxTBQHaFl?rs=1&pid=ImgDetMain"}
                                                    alt={article.urlToImage}
                                                    style={{
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-col px-3 p-1 gap-2">
                                                <h3 className='font-bold mb-2'>{article.title}</h3>
                                                <div className="flex gap-2">
                                                    <Badge variant={"default"}>{article.author}</Badge>
                                                    <Badge variant={"default"}>{article.publishedAt}</Badge>
                                                    <Badge variant={"default"}>{article.source.name}</Badge>

                                                </div>
                                                <p className='text-sm text-gray-600'>{article.content}</p>
                                            </div>
                                        </div>
                                    </a>
                                </Link>

                            )) : <p className='text-sm'>Content not found</p>
                        }

                        {
                            articles && articles.length > 0 && <Button className='w-full lg:w-3/4'>More articles</Button>
                        }
                    </div>
                </div>


                <div className="flex-w-full lg:w-1/4 px-4">
                    <div className="sticky top-0 flex flex-col gap-3">
                        <h2 className='font-bold'>Top news!</h2>
                        <div className="w-full h-10 relative overflow-hidden rounded-sm">
                            <Image
                                fill
                                src={"https://th.bing.com/th/id/R.5fd876ffb81b9c3510ad368b6c22d378?rik=B78DjaNJoSZkng&riu=http%3a%2f%2f1.bp.blogspot.com%2f-4ouLgTLLAg4%2fUWisoR_ffCI%2fAAAAAAAABi8%2fmJFdT65vFkg%2fs1600%2fbreakingnews.jpg&ehk=%2fAZdSMqdA4APKi0grN7C5Hg64p%2faUSt41N6zWBNFOUg%3d&risl=&pid=ImgRaw&r=0"}
                                alt='image-1'
                                style={{
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                        <div className="w-full h-10 relative overflow-hidden rounded-sm">
                            <Image
                                fill
                                src={"https://th.bing.com/th/id/OIP.pMfU6pM99MLZKEn-5Ly1EAAAAA?rs=1&pid=ImgDetMain"}
                                alt='image-1'
                                style={{
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                        <div className="w-full h-10 relative overflow-hidden rounded-sm">
                            <Image
                                fill
                                src={"https://www.clrchs.co.uk/wp-content/uploads/2021/01/breaking-news.jpg"}
                                alt='image-1'
                                style={{
                                    objectFit: "cover"
                                }}
                            />
                        </div>

                        <h2 className='font-bold'>Related posts</h2>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className='font-bold mb-4'>Dummy content</h3>
                            <p>Occaecat nostrud culpa aliquip amet eu aliquip mollit velit mollit minim in quis sit. </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className='font-bold mb-4'>Dummy content</h3>
                            <p>Occaecat nostrud culpa aliquip amet eu aliquip mollit velit mollit minim in quis sit. </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className='font-bold mb-4'>Dummy content</h3>
                            <p>Occaecat nostrud culpa aliquip amet eu aliquip mollit velit mollit minim in quis sit. </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Articles