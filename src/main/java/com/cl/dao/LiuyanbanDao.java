package com.cl.dao;

import com.cl.entity.LiuyanbanEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.LiuyanbanView;


/**
 * 留言板
 * 
 * @author 
 * @email 
 * @date 2024-03-19 21:20:19
 */
public interface LiuyanbanDao extends BaseMapper<LiuyanbanEntity> {
	
	List<LiuyanbanView> selectListView(@Param("ew") Wrapper<LiuyanbanEntity> wrapper);

	List<LiuyanbanView> selectListView(Pagination page,@Param("ew") Wrapper<LiuyanbanEntity> wrapper);
	
	LiuyanbanView selectView(@Param("ew") Wrapper<LiuyanbanEntity> wrapper);
	

}
