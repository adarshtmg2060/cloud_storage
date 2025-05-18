import { useState, useEffect } from 'react';
import { 
  FiFolder, FiStar, FiDownload, FiShare2, FiTrash2, 
  FiMoreVertical, FiGrid, FiList, FiSearch 
} from "react-icons/fi";
import { 
   BsFileEarmarkImage, BsFileEarmarkMusic, 
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
  // State for current view and filtering
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'starred' | 'shared' | 'recent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, fileId: string} | null>(null);
  
  // Sample data structure
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

  // Get current directory files
  const getCurrentFiles = (): FileItem[] => {
    const currentDir = currentPath.length > 0 ? currentPath[currentPath.length - 1] : 'root';
    let files = folderStructure[currentDir] || [];
    
    // Apply filters
    if (filter === 'starred') {
      files = files.filter(file => file.starred);
    } else if (filter === 'shared') {
      files = files.filter(file => file.shared);
    } else if (filter === 'recent') {
      files = [...files].sort((a, b) => 
        new Date(b.modified).getTime() - new Date(a.modified).getTime()
      ).slice(0, 5);
    }
    
    // Apply search
    if (searchQuery) {
      files = files.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return files;
  };

  // Get file icon based on type
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

  // Handle folder navigation
  const navigateToFolder = (folderId: string) => {
    const folder = folderStructure[currentPath.length > 0 ? currentPath[currentPath.length - 1] : 'root']
      .find(item => item.id === folderId);
    if (folder) {
      setCurrentPath([...folder.path, folderId]);
    }
  };

  // Handle file actions
  const handleFileAction = (action: string, fileId: string) => {
    switch(action) {
      case 'download':
        // Implement download logic
        console.log('Downloading file:', fileId);
        break;
      case 'share':
        // Implement share logic
        console.log('Sharing file:', fileId);
        break;
      case 'star':
        // Toggle star status
        const currentDir = currentPath.length > 0 ? currentPath[currentPath.length - 1] : 'root';
        setFolderStructure(prev => ({
          ...prev,
          [currentDir]: prev[currentDir].map(file => 
            file.id === fileId ? {...file, starred: !file.starred} : file
          )
        }));
        break;
      case 'delete':
        // Implement delete logic
        console.log('Deleting file:', fileId);
        break;
      default:
        break;
    }
    setSelectedFile(null);
  };

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent, fileId: string) => {
    e.preventDefault();
    setContextMenu({x: e.clientX, y: e.clientY, fileId});
  };

  // Close context menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="my-drive p-4 bg-white rounded-lg shadow-sm">
      {/* Toolbar with search and view options */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        {/* Breadcrumb navigation */}
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
                <span className="mx-2">/</span>
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
          {/* Search */}
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
          
          {/* View mode toggle */}
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
      
      {/* Filter tabs */}
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
      
      {/* Files display */}
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
                
                {/* File action menu */}
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
                      
                      {/* File action menu */}
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
      
      {/* Context menu */}
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
      
      {/* Empty state */}
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

export default MyDrive;