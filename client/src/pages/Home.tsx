import { useState, useRef, useEffect } from 'react';
import { APP_NAME } from "../constants/App";
import Cloud_Icon from "../assets/cloud-icon.svg";
import { 
  FiHome, FiUpload, FiFolder, FiStar, FiTrash2, FiShare2, 
  FiMoreVertical, FiSearch, FiGrid, FiList, FiSettings, 
  FiUser, FiLogOut, FiPlus, FiChevronDown, FiHardDrive,
  FiDownload, FiChevronRight
} from "react-icons/fi";
import { 
  BsFileEarmarkText, BsFileEarmarkImage, BsFileEarmarkMusic, 
  BsFileEarmarkPlay, BsFileEarmarkPdf, BsFileEarmarkExcel,
  BsFileEarmarkWord, BsFileEarmarkZip
} from "react-icons/bs";
import { AiOutlineFile } from "react-icons/ai";

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'image' | 'audio' | 'video' | 'doc' | 'xls' | 'zip' | 'other';
  size: string;
  modified: string;
  starred: boolean;
  shared?: boolean;
  path: string[];
}

interface FolderStructure {
  [key: string]: FileItem[];
}

const MyDrive = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'starred' | 'shared' | 'recent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, fileId: string} | null>(null);
  
  const [folderStructure, setFolderStructure] = useState<FolderStructure>({
    'root': [
      { id: 'folder1', name: 'Work Projects', type: 'folder', size: '-', modified: '2 days ago', starred: true, path: ['root'] },
      { id: 'folder2', name: 'Personal', type: 'folder', size: '-', modified: '1 week ago', starred: false, path: ['root'] },
      { id: 'file1', name: 'Project Proposal.pdf', type: 'pdf', size: '2.4 MB', modified: '2 days ago', starred: true, path: ['root'] },
      { id: 'file2', name: 'Vacation.jpg', type: 'image', size: '4.2 MB', modified: '1 week ago', starred: false, path: ['root'] },
    ],
    'folder1': [
      { id: 'file3', name: 'Meeting Notes.docx', type: 'doc', size: '1.1 MB', modified: '3 days ago', starred: true, path: ['root', 'folder1'] },
      { id: 'file4', name: 'Budget.xlsx', type: 'xls', size: '1.8 MB', modified: '5 days ago', starred: false, path: ['root', 'folder1'] },
    ],
    'folder2': [
      { id: 'file5', name: 'Music Playlist.mp3', type: 'audio', size: '3.5 MB', modified: '1 day ago', starred: false, path: ['root', 'folder2'] },
      { id: 'file6', name: 'Tutorial.mp4', type: 'video', size: '15.2 MB', modified: '2 weeks ago', starred: true, path: ['root', 'folder2'] },
    ]
  });

  const getCurrentFiles = (): FileItem[] => {
    const currentDir = currentPath.length > 0 ? currentPath[currentPath.length - 1] : 'root';
    let files = folderStructure[currentDir] || [];
    
    if (filter === 'starred') {
      files = files.filter(file => file.starred);
    } else if (filter === 'shared') {
      files = files.filter(file => file.shared);
    } else if (filter === 'recent') {
      files = [...files].sort((a, b) => 
        new Date(b.modified).getTime() - new Date(a.modified).getTime()
      ).slice(0, 5);
    }
    
    if (searchQuery) {
      files = files.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return files;
  };

  const getFileIcon = (type: FileItem['type']) => {
    switch(type) {
      case 'folder': return <FiFolder className="text-blue-500 text-xl" />;
      case 'pdf': return <BsFileEarmarkPdf className="text-red-500 text-xl" />;
      case 'image': return <BsFileEarmarkImage className="text-green-500 text-xl" />;
      case 'audio': return <BsFileEarmarkMusic className="text-purple-500 text-xl" />;
      case 'video': return <BsFileEarmarkPlay className="text-yellow-500 text-xl" />;
      case 'doc': return <BsFileEarmarkWord className="text-blue-600 text-xl" />;
      case 'xls': return <BsFileEarmarkExcel className="text-green-600 text-xl" />;
      case 'zip': return <BsFileEarmarkZip className="text-orange-500 text-xl" />;
      default: return <AiOutlineFile className="text-gray-500 text-xl" />;
    }
  };

  const navigateToFolder = (folderId: string) => {
    const folder = folderStructure[currentPath.length > 0 ? currentPath[currentPath.length - 1] : 'root']
      .find(item => item.id === folderId);
    if (folder) {
      setCurrentPath([...folder.path, folderId]);
    }
  };

  const handleFileAction = (action: string, fileId: string) => {
    switch(action) {
      case 'download':
        console.log('Downloading file:', fileId);
        break;
      case 'share':
        console.log('Sharing file:', fileId);
        break;
      case 'star':
        const currentDir = currentPath.length > 0 ? currentPath[currentPath.length - 1] : 'root';
        setFolderStructure(prev => ({
          ...prev,
          [currentDir]: prev[currentDir].map(file => 
            file.id === fileId ? {...file, starred: !file.starred} : file
          )
        }));
        break;
      case 'delete':
        console.log('Deleting file:', fileId);
        break;
      default:
        break;
    }
    setSelectedFile(null);
  };

  const handleContextMenu = (e: React.MouseEvent, fileId: string) => {
    e.preventDefault();
    setContextMenu({x: e.clientX, y: e.clientY, fileId});
  };

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="my-drive p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center text-sm text-gray-600">
          <button 
            onClick={() => setCurrentPath([])} 
            className="hover:text-black hover:underline"
          >
            My Drive
          </button>
          {currentPath.map((folderId, index) => {
            const folderName = folderStructure[index === 0 ? 'root' : currentPath[index - 1]]
              ?.find(f => f.id === folderId)?.name || 'Folder';
            return (
              <span key={folderId} className="flex items-center">
                <FiChevronRight className="mx-1 text-gray-400" />
                <button 
                  onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                  className="hover:text-black hover:underline"
                >
                  {folderName}
                </button>
              </span>
            );
          })}
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search in Drive..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button 
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </button>
            <button 
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('list')}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-6 border-b border-gray-200 mb-6 overflow-x-auto">
        <button 
          className={`pb-3 whitespace-nowrap ${filter === 'all' ? 'border-b-2 border-black font-medium' : 'text-gray-600'}`}
          onClick={() => setFilter('all')}
        >
          All files
        </button>
        <button 
          className={`pb-3 whitespace-nowrap ${filter === 'starred' ? 'border-b-2 border-black font-medium' : 'text-gray-600'}`}
          onClick={() => setFilter('starred')}
        >
          Starred
        </button>
        <button 
          className={`pb-3 whitespace-nowrap ${filter === 'shared' ? 'border-b-2 border-black font-medium' : 'text-gray-600'}`}
          onClick={() => setFilter('shared')}
        >
          Shared
        </button>
        <button 
          className={`pb-3 whitespace-nowrap ${filter === 'recent' ? 'border-b-2 border-black font-medium' : 'text-gray-600'}`}
          onClick={() => setFilter('recent')}
        >
          Recent
        </button>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {getCurrentFiles().map(file => (
            <div 
              key={file.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer relative"
              onClick={() => file.type === 'folder' ? navigateToFolder(file.id) : null}
              onContextMenu={(e) => handleContextMenu(e, file.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`p-3 rounded-lg ${file.type === 'folder' ? 'bg-blue-50' : 'bg-gray-100'}`}>
                  {getFileIcon(file.type)}
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(selectedFile === file.id ? null : file.id);
                  }}
                >
                  <FiMoreVertical />
                </button>
                
                {selectedFile === file.id && (
                  <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border border-gray-200 z-10 w-48">
                    <button 
                      className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileAction('download', file.id);
                      }}
                    >
                      <FiDownload className="text-lg" />
                      <span>Download</span>
                    </button>
                    <button 
                      className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileAction('share', file.id);
                      }}
                    >
                      <FiShare2 className="text-lg" />
                      <span>Share</span>
                    </button>
                    <button 
                      className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileAction('star', file.id);
                      }}
                    >
                      <FiStar className="text-lg" />
                      <span>{file.starred ? 'Remove star' : 'Add star'}</span>
                    </button>
                    <button 
                      className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left border-t border-gray-200 text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileAction('delete', file.id);
                      }}
                    >
                      <FiTrash2 className="text-lg" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
              <h3 className="font-medium mb-1 truncate">{file.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{file.size}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{file.modified}</span>
                <button 
                  className={`${file.starred ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileAction('star', file.id);
                  }}
                >
                  <FiStar />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCurrentFiles().map(file => (
                <tr 
                  key={file.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onContextMenu={(e) => handleContextMenu(e, file.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      className="flex items-center"
                      onClick={() => file.type === 'folder' ? navigateToFolder(file.id) : null}
                    >
                      <div className={`flex-shrink-0 p-2 rounded-lg mr-3 ${file.type === 'folder' ? 'bg-blue-50' : 'bg-gray-100'}`}>
                        {getFileIcon(file.type)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.modified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <button 
                        className={`mr-3 ${file.starred ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileAction('star', file.id);
                        }}
                      >
                        <FiStar />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(selectedFile === file.id ? null : file.id);
                        }}
                      >
                        <FiMoreVertical />
                      </button>
                      
                      {selectedFile === file.id && (
                        <div className="absolute right-10 bg-white rounded-lg shadow-lg border border-gray-200 z-10 w-48">
                          <button 
                            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileAction('download', file.id);
                            }}
                          >
                            <FiDownload className="text-lg" />
                            <span>Download</span>
                          </button>
                          <button 
                            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileAction('share', file.id);
                            }}
                          >
                            <FiShare2 className="text-lg" />
                            <span>Share</span>
                          </button>
                          <button 
                            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left border-t border-gray-200 text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileAction('delete', file.id);
                            }}
                          >
                            <FiTrash2 className="text-lg" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {contextMenu && (
        <div 
          className="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-48"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left"
            onClick={() => {
              handleFileAction('download', contextMenu.fileId);
              setContextMenu(null);
            }}
          >
            <FiDownload className="text-lg" />
            <span>Download</span>
          </button>
          <button 
            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left"
            onClick={() => {
              handleFileAction('share', contextMenu.fileId);
              setContextMenu(null);
            }}
          >
            <FiShare2 className="text-lg" />
            <span>Share</span>
          </button>
          <button 
            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left"
            onClick={() => {
              handleFileAction('star', contextMenu.fileId);
              setContextMenu(null);
            }}
          >
            <FiStar className="text-lg" />
            <span>Star</span>
          </button>
          <button 
            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left border-t border-gray-200 text-red-500"
            onClick={() => {
              handleFileAction('delete', contextMenu.fileId);
              setContextMenu(null);
            }}
          >
            <FiTrash2 className="text-lg" />
            <span>Delete</span>
          </button>
        </div>
      )}
      
      {getCurrentFiles().length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiFolder className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No files found</h3>
          <p className="text-gray-500">
            {searchQuery ? 'Try a different search term' : 'Upload or create files to get started'}
          </p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const [firstLogoName, secondLogoName] = APP_NAME.split(" ");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showNewMenu, setShowNewMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const storageUsage = 65; // percentage

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="home-page min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-20 bg-white p-2 rounded-lg shadow-sm border border-gray-200"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-4 transition-all duration-300 z-10 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center space-x-2 mb-8">
          <img src={Cloud_Icon} className="h-8 w-8" alt="Cloud icon" />
          <h1 className="text-xl font-semibold">
            <span>{firstLogoName}</span>
            <span className="font-bold">{secondLogoName}</span>
          </h1>
        </div>

        {/* New Button with Dropdown */}
        <div className="relative mb-6">
          <button 
            className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
            onClick={() => setShowNewMenu(!showNewMenu)}
          >
            <FiPlus className="text-lg" />
            <span>New</span>
            <FiChevronDown className={`transition-transform ${showNewMenu ? 'rotate-180' : ''}`} />
          </button>
          
          {showNewMenu && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left">
                <FiFolder className="text-lg" />
                <span>New folder</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left">
                <FiUpload className="text-lg" />
                <span>File upload</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 text-left">
                <FiUpload className="text-lg" />
                <span>Folder upload</span>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="space-y-1 mb-8">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-100 text-black">
            <FiHome className="text-lg" />
            <span>Home</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <FiHardDrive className="text-lg" />
            <span>My Drive</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <FiStar className="text-lg" />
            <span>Starred</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <FiShare2 className="text-lg" />
            <span>Shared with me</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <FiTrash2 className="text-lg" />
            <span>Bin</span>
          </button>
        </div>

        {/* Storage */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Storage</span>
            <span className="text-sm font-medium">{storageUsage}% used</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-black h-2 rounded-full" 
              style={{ width: `${storageUsage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">15.2 GB of 25 GB used</p>
        </div>

        {/* Bottom Menu */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <FiSettings className="text-lg" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'} p-4 md:p-6`}>
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">My Drive</h2>
          
          <div className="flex flex-col md:flex-row w-full md:w-auto gap-3">
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search in Drive..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-black"
              />
            </div>
            
            <div className="flex items-center gap-2">
              {/* Profile Dropdown */}
              <div className="relative" ref={profileMenuRef}>
                <button 
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    U
                  </div>
                </button>
                
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium">User Name</p>
                      <p className="text-xs text-gray-500">user@example.com</p>
                    </div>
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiUser className="inline mr-2" /> Profile
                    </button>
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiSettings className="inline mr-2" /> Settings
                    </button>
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                    >
                      <FiLogOut className="inline mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* MyDrive Component */}
        <MyDrive />

        {/* Recent Activity - Optional */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-start space-x-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <FiUser className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">You</span> {item === 1 ? 'uploaded Project_Document.pdf' : item === 2 ? 'shared Vacation_Photo.jpg' : 'edited Meeting_Notes.docx'}
                  </p>
                  <p className="text-xs text-gray-500">{item === 1 ? '2 days ago' : item === 2 ? '1 week ago' : '3 days ago'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;