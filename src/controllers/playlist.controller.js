import mongoose, {isValidObjectId} from "mongoose"
import {Playlist, Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    //TODO: create playlist

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user?._id

    })

    if(!playlist){
        throw new ApiError(500, "Something went wrong while creating playlist")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            200,
            playlist,
            "Playlist created Successfully"
        )
    )
    
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists

    if(!isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user id")
    }

    const Playlist = await Playlist.find({
        owner: userId
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            Playlists, 
            "User playlists fetched successfully"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id

    if(isValidObjectId(playlistId)){
        throw new ApiError(400, "Invalid playlist id")
    }

    const playlist = await Playlist.findById(playlistId)

    if(!playlist){
        throw new ApiError(404, "Playlist not found")
    }

    return res.status(200).json(200, playlist, "Playlist fetches successfully")
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid Playlist ID or Video ID");
    }

    const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
        $addToSet: {
            videos : videoId
        }
    },
    {
        new:true
    }
)

    if(!playlist){
        throw new ApiError(404, "Playlist not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            playlist,
            "Video added to playlist successfully"
        )
    )

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

    if(!isValidObjectId(playlistId) || (!isValidObjectId(videoId))){
        throw new ApiError(400, "Invalid Playlist or Video ID")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull:{
                videos : videoId
            }
        },
        {
            new: true
        }
    )
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            playlist,
            "Video Removed from playlist"
        )
    )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400, "Invalid playlist id")
    }

    const playlist = await Playlist.findByIdAndDelete(playlistId)

    if(!playlist){
        throw new ApiError(404, "Playlist not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            playlist,
            "Playlist deleted successfully"
        )
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400, "Invalid Playlist id")        
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            name : name,
            description: description
        },
        {
            new: true
        }
    )

     if(!playlist){
        throw new ApiError(404, "Playlist not found")
    }

     return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            playlist,
            "Playlist updated successfully"
        )
    )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}