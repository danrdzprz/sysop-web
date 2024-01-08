<?php

namespace App\Http\Controllers\Api\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Interfaces\PostRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected PostRepositoryInterface $postRepository,
    ) {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\LengthAwarePaginator
     */
    public function index(): LengthAwarePaginator
    {
        return $this->postRepository->getAllPosts();
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post): Post
    {
        return $this->postRepository->getPostById($post->id);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostCreateRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $this->postRepository->createPost($data);

        return response()->json([
            'messagge' => __('api.posts.create.success'),
        ], JsonResponse::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostUpdateRequest $request, Post $post)
    {
        $data = $request->validated();
        $this->postRepository->updatePost($post->id, $data);

        return response()->json([
            'messagge' => __('api.posts.update.success'),
        ], JsonResponse::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $this->postRepository->deletePost($post->id);

        return response()->json([
            'messagge' => __('api.posts.delete.success'),
        ], JsonResponse::HTTP_OK);
    }
}
