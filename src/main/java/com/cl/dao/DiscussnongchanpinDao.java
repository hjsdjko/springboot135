package com.cl.dao;

import com.cl.entity.DiscussnongchanpinEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.DiscussnongchanpinView;


/**
 * 农产品评论表
 * 
 * @author 
 * @email 
 * @date 2024-03-19 21:20:19
 */
public interface DiscussnongchanpinDao extends BaseMapper<DiscussnongchanpinEntity> {
	
	List<DiscussnongchanpinView> selectListView(@Param("ew") Wrapper<DiscussnongchanpinEntity> wrapper);

	List<DiscussnongchanpinView> selectListView(Pagination page,@Param("ew") Wrapper<DiscussnongchanpinEntity> wrapper);
	
	DiscussnongchanpinView selectView(@Param("ew") Wrapper<DiscussnongchanpinEntity> wrapper);
	

}
