import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import Folder from './Folder';
import useTraverseTree from '../hooks/use-traverse-tree';

const Files = () => {
    const navigate = useNavigate();

    const [dataTree, setDataTree] = useState({
        id: 1,
        name: 'Loading data',
        isFolder: true,
        items: [],
    });

    const redirectToLogin = () => {
        sessionStorage.removeItem('token');
            navigate('/login');
    }

    const getDataTree = async () => {
        try {
            const res = await axiosInstance.get('/fileTree');
            const data = await JSON.parse(res?.data?.currentTree);
            if (!data) {
                redirectToLogin();
                return;
            }
            setDataTree((data));
        } catch (error) {
            redirectToLogin();
        }
    };


  useEffect(()=> {
    getDataTree();
  },[]);

  const updateFolderCall = async(tree) => {
    let updatedDataTree = null;
    let parsedTree = null;
    const stringifiedTree = JSON.stringify(tree);

    try {
        updatedDataTree = await axiosInstance.post('/fileTree', { tree: stringifiedTree });
        parsedTree = await JSON.parse(updatedDataTree?.data?.updatedTree)
    } catch(err) {
        console.error("Error adding folder", err.message);
    };



    return parsedTree;
};

  const { insertNode, deleteNode } = useTraverseTree();

  const handleInsertNode = async( folderId, item, isFolder ) => {
    const finalTree = await insertNode( dataTree, folderId, item, isFolder );

    console.log(finalTree, '#####')

    await updateFolderCall(finalTree);
    setDataTree(finalTree);
  };

  const handleDeleteNode = async( folderId ) => {
    const finalUpdatedTree = await deleteNode( dataTree, folderId );

    console.log(finalUpdatedTree, '#####')

    await updateFolderCall(finalUpdatedTree);
    setDataTree(finalUpdatedTree);
  };

  return(
  <Folder 
    dataTree={dataTree} 
    handleDeleteNode={handleDeleteNode} 
    handleInsertNode={handleInsertNode} 
    />
    )
}

export default Files